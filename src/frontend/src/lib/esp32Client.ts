export interface ESP32Status {
    temp: number;
    humidity: number;
    day: number;
    days_left: number;
    status: string;
    turn_time: string;
    mode: string;
}

export interface ESP32ClientError {
    message: string;
    type: 'network' | 'parse' | 'config';
}

const DEFAULT_TIMEOUT = 5000;

export class ESP32Client {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.trim().replace(/\/$/, '');
    }

    private async fetchWithTimeout(url: string, timeout = DEFAULT_TIMEOUT): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                mode: 'cors',
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async getStatus(): Promise<ESP32Status> {
        if (!this.baseUrl) {
            throw {
                message: 'ESP32 base URL not configured',
                type: 'config',
            } as ESP32ClientError;
        }

        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}/status`);
            
            if (!response.ok) {
                throw {
                    message: `HTTP ${response.status}: ${response.statusText}`,
                    type: 'network',
                } as ESP32ClientError;
            }

            const data = await response.json();
            return data as ESP32Status;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw {
                    message: 'Request timeout - ESP32 not responding',
                    type: 'network',
                } as ESP32ClientError;
            }
            if (error.type) {
                throw error;
            }
            throw {
                message: error.message || 'Failed to connect to ESP32',
                type: 'network',
            } as ESP32ClientError;
        }
    }

    async manualTurn(): Promise<void> {
        if (!this.baseUrl) {
            throw {
                message: 'ESP32 base URL not configured',
                type: 'config',
            } as ESP32ClientError;
        }

        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}/manualTurn`);
            if (!response.ok) {
                throw {
                    message: `Failed to trigger manual turn: ${response.statusText}`,
                    type: 'network',
                } as ESP32ClientError;
            }
        } catch (error: any) {
            if (error.type) throw error;
            throw {
                message: error.message || 'Failed to trigger manual turn',
                type: 'network',
            } as ESP32ClientError;
        }
    }

    async setTemp(value: number): Promise<void> {
        if (!this.baseUrl) {
            throw {
                message: 'ESP32 base URL not configured',
                type: 'config',
            } as ESP32ClientError;
        }

        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}/setTemp?value=${value}`);
            if (!response.ok) {
                throw {
                    message: `Failed to set temperature: ${response.statusText}`,
                    type: 'network',
                } as ESP32ClientError;
            }
        } catch (error: any) {
            if (error.type) throw error;
            throw {
                message: error.message || 'Failed to set temperature',
                type: 'network',
            } as ESP32ClientError;
        }
    }

    async setHumidity(value: number): Promise<void> {
        if (!this.baseUrl) {
            throw {
                message: 'ESP32 base URL not configured',
                type: 'config',
            } as ESP32ClientError;
        }

        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}/setHumidity?value=${value}`);
            if (!response.ok) {
                throw {
                    message: `Failed to set humidity: ${response.statusText}`,
                    type: 'network',
                } as ESP32ClientError;
            }
        } catch (error: any) {
            if (error.type) throw error;
            throw {
                message: error.message || 'Failed to set humidity',
                type: 'network',
            } as ESP32ClientError;
        }
    }

    async setMode(value: string): Promise<void> {
        if (!this.baseUrl) {
            throw {
                message: 'ESP32 base URL not configured',
                type: 'config',
            } as ESP32ClientError;
        }

        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}/setMode?value=${value}`);
            if (!response.ok) {
                throw {
                    message: `Failed to set mode: ${response.statusText}`,
                    type: 'network',
                } as ESP32ClientError;
            }
        } catch (error: any) {
            if (error.type) throw error;
            throw {
                message: error.message || 'Failed to set mode',
                type: 'network',
            } as ESP32ClientError;
        }
    }
}
