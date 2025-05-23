export class Logger{
    static log(msg: string): void {
        console.log(`[${new Date().toISOString()}] ${msg}`);
    }

    static error(msg: string): void {
        console.error(`[${new Date().toISOString()}] ERROR: ${msg}`);
    }
}