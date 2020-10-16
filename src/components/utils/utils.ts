// export const ifundefined = (input: any, a: Function, b: Function) =>
// 	input !== undefined ? a : b;

const makeEqualityCheck = (conditional: any) => (
	input: any,
	outA: Function,
	outB: Function
) => (input !== conditional ? outA : outB);

export const ifundefined = makeEqualityCheck(undefined);

export const dateTimeFormat = (inputDate: string): Function => {
	return () => {
		const [date, time] = inputDate.split('T');
		const pdate = date.split('-').reverse().join('/');
		const ptime = time.slice(0, 8);
		const final = [pdate, ptime].join(' ');
		return final;
	};
};
