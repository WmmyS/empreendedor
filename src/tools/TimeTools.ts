export class TimeTolls {
  public static convertToSeconds(expiresIn: string): number | null {
    if (typeof expiresIn === 'number') {
        return expiresIn;
    }
    if (typeof expiresIn === 'string') {
        const timeUnits = {
            s: 1,        // Seconds
            m: 60,       // Minutes
            h: 3600,     // Hours
            d: 86400,    // Days
        };

        const regex = /^(\d+)(s|m|h|d)$/; // Matches strings like "60s", "2d", "10h"
        const match = expiresIn.match(regex);

        if (match) {
            const value = parseInt(match[1], 10);
            const unit = match[2];
            return value * timeUnits[unit];
        }

        throw new Error(`Invalid time format: ${expiresIn}`);
    }
    return null; // Undefined or invalid input
  }
}