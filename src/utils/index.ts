
export const getDaysFromNow = (targetDate: Date) => {
    const now = new Date();
    const deltaT = targetDate.getTime() - now.getTime();
    return Math.round(deltaT / (1000 * 3600 * 24));
}