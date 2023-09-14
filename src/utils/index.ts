export const getNumberOfDaysLeft = (timestamp: number): number => {
	let timestampPresent = Math.floor(new Date().getTime() / 1000.0)

	return Math.ceil((timestamp - timestampPresent) / (60 * 60 * 24))
}
