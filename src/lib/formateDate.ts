export const formatDate = (date: Date) =>
	date.toLocaleString('en_US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
