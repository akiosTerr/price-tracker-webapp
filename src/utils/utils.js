export const groupBy = (array, prop) => {
	const groups = array.reduce((groups, item) => {
		const group = groups[item[prop]] || [];
		group.push(item);
		groups[item[prop]] = group;
		return groups;
	}, {});

	return groups;
};

export const getDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();

	const fdate = mm + '/' + dd + '/' + yyyy;
	return fdate;
};

export const getFormatedDomains = (urls) => {
	const domains = urls.map((item) => {
		item.domain = String(item.link.match(/(?<=\.)[\w.]+/));
		return item;
	});
	return domains;
};

export const convertToFloat = (array) => {
	const filtered = array.filter((item) => item !== undefined);
	const values = filtered.map((value) => {
		const string1 = value.replace(/([a-zA-Z]\$)|\./g, '');
		const string2 = string1.replace(/[,]/g, '.');
		return Number(string2);
	});
	return values;
};
