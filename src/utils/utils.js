export const groupBy = (array, prop) => {
	const groups = array.reduce((groups, item) => {
		const group = groups[item[prop]] || [];
		group.push(item);
		groups[item[prop]] = group;
		return groups;
	}, {});

	return groups;
};
