import { Collection, Db, MongoClient } from 'mongodb';
import { BlogsType } from '../blogs/types/blogs';
import { PostsType } from '../posts/types/posts';
import { SETTINGS } from '../core/settings/settings';

const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogsCollection: Collection<BlogsType>;
export let postCollection: Collection<PostsType>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    // Инициализация коллекций
    blogsCollection = db.collection<BlogsType>(BLOGS_COLLECTION_NAME);
    postCollection = db.collection<PostsType>(POSTS_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}

// для тестов
export async function stopDb() {
    if (!client) {
        throw new Error(`❌ No active client`);
    }
    await client.close();
}