export enum Visibility {
	visible = 'active',
	invisible = '',
}

export const initialVisbility: Visibility = Visibility.invisible;

export const init = (initialVisbility: Visibility) => {
	return { visibility: initialVisbility };
};

export const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'turnOn':
			return { visibility: Visibility.visible };

		case 'turnOff':
			return { visibility: Visibility.invisible };

		case 'toggle':
			return {
				visibility:
					state.visibility === Visibility.visible
						? Visibility.invisible
						: Visibility.visible,
			};

		default:
			return { visibility: Visibility.invisible };
	}
};
