/**
 * Simple rate limiter to prevent API rate limit issues
 */
export class RateLimiter {
    private queue: Array<() => Promise<any>> = [];
    private isProcessing = false;
    private requestsPerMinute: number;
    private lastRequestTime = 0;

    /**
     * Create a new rate limiter
     *
     * @param requestsPerMinute Maximum requests per minute
     */
    constructor(requestsPerMinute = 90) {
        this.requestsPerMinute = requestsPerMinute;
    }

    /**
     * Add a request to the queue
     *
     * @param fn Function to execute
     * @returns Promise that resolves with the result of the function
     */
    public async add<T>(fn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            if (!this.isProcessing) {
                this.process();
            }
        });
    }

    /**
     * Process the queue
     */
    private async process(): Promise<void> {
        if (this.queue.length === 0) {
            this.isProcessing = false;
            return;
        }

        this.isProcessing = true;
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        const minInterval = 60000 / this.requestsPerMinute;

        if (timeSinceLastRequest < minInterval) {
            await new Promise(resolve =>
                setTimeout(resolve, minInterval - timeSinceLastRequest)
            );
        }

        const request = this.queue.shift();
        if (request) {
            this.lastRequestTime = Date.now();
            await request();
        }

        // Process next request
        this.process();
    }
}
