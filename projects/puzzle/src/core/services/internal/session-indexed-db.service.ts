import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SessionIndexedDbService {
	private dbName = 'biSessionDB';
	private dbVersion = 1;
	private db: IDBDatabase | null = null;
	private readonly sessionId: string;

	constructor() {
		// 创建或获取本次会话的唯一ID
		this.sessionId = this.getOrCreateSessionId();
	}

	private getOrCreateSessionId(): string {
		// 使用 session cookie 存储会话ID
		const sessionId = document.cookie
			.split('; ')
			.find(row => row.startsWith('sessionId='))
			?.split('=')[1];

		if (sessionId) {
			return sessionId;
		} else {
			const newId = 'session-' + Math.random().toString(36).substring(2, 11);
			document.cookie = `sessionId=${newId}; path=/; SameSite=Lax`;
			return newId;
		}
	}

	public async initDatabase(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, this.dbVersion);

			request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				const db = (event.target as IDBOpenDBRequest).result;

				if (!db.objectStoreNames.contains('sessionData')) {
					const store = db.createObjectStore('sessionData', { keyPath: 'id' });
					store.createIndex('sessionId', 'sessionId', { unique: false });
					store.createIndex('expires', 'expires', { unique: false });
				}
			};

			request.onsuccess = (event: Event) => {
				this.db = (event.target as IDBOpenDBRequest).result;
				this.cleanupExpiredData(); // 初始化时清理过期数据
				resolve(this.db);
			};

			request.onerror = (event: Event) => {
				reject('IndexedDB error: ' + (event.target as IDBOpenDBRequest).error);
			};
		});
	}

	// 存储数据并设置过期时间（单位：毫秒）
	public async setItem(key: string, value: any, ttl?: number): Promise<void> {
		if (!this.db) await this.initDatabase();

		const transaction = this.db!.transaction('sessionData', 'readwrite');
		const store = transaction.objectStore('sessionData');

		const expires = ttl ? Date.now() + ttl : undefined;

		store.put({
			id: key,
			sessionId: this.sessionId,
			value,
			expires,
			createdAt: Date.now(),
		});
	}

	// 获取数据（自动过滤过期数据）
	public async getItem(key: string): Promise<any> {
		if (!this.db) await this.initDatabase();

		const transaction = this.db!.transaction('sessionData', 'readonly');
		const store = transaction.objectStore('sessionData');
		const request = store.get(key);

		return new Promise((resolve, reject) => {
			request.onsuccess = () => {
				const item = request.result;
				if (item && (!item.expires || item.expires > Date.now())) {
					resolve(item.value);
				} else {
					if (item) this.deleteItem(key); // 自动删除过期数据
					resolve(null);
				}
			};
			request.onerror = () => reject(request.error);
		});
	}

	// 清理过期数据和旧会话数据
	private async cleanupExpiredData(): Promise<void> {
		if (!this.db) return;

		const transaction = this.db.transaction('sessionData', 'readwrite');
		const store = transaction.objectStore('sessionData');
		const now = Date.now();

		// 删除过期数据
		const expiresIndex = store.index('expires');
		const expiresRequest = expiresIndex.openCursor(IDBKeyRange.upperBound(now));

		expiresRequest.onsuccess = (event: Event) => {
			const cursor = (event.target as IDBRequest).result;
			if (cursor) {
				cursor.delete();
				cursor.continue();
			}
		};

		// 删除非当前会话的数据（模拟sessionStorage行为）
		const sessionIndex = store.index('sessionId');
		const sessionRequest = sessionIndex.openCursor();

		sessionRequest.onsuccess = (event: Event) => {
			const cursor = (event.target as IDBRequest).result;
			if (cursor) {
				if (cursor.value.sessionId !== this.sessionId) {
					cursor.delete();
				}
				cursor.continue();
			}
		};
	}

	// 删除数据
	public async deleteItem(key: string): Promise<void> {
		if (!this.db) await this.initDatabase();

		const transaction = this.db!.transaction('sessionData', 'readwrite');
		const store = transaction.objectStore('sessionData');
		await store.delete(key);
	}

	// 清空当前会话的所有数据
	public async clearSession(): Promise<void> {
		if (!this.db) await this.initDatabase();

		const transaction = this.db!.transaction('sessionData', 'readwrite');
		const store = transaction.objectStore('sessionData');
		const index = store.index('sessionId');
		const request = index.openCursor(IDBKeyRange.only(this.sessionId));

		return new Promise((resolve, reject) => {
			request.onsuccess = (event: Event) => {
				const cursor = (event.target as IDBRequest).result;
				if (cursor) {
					cursor.delete();
					cursor.continue();
				} else {
					resolve();
				}
			};
			request.onerror = () => reject(request.error);
		});
	}
}
