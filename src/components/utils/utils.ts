export const dateTimeFormat = (inputDate: string): string => {
	const [date, time] = inputDate.split('T');
	const pdate = date.split('-').reverse().join('/');
	const ptime = time.slice(0, 8);
	const final = [pdate, ptime].join(' ');
	return final;
};
