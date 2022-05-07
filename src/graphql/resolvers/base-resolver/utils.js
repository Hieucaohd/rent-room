export function getPropertyHaveDefault(subClassMeta, superClassMeta, field) {
	let property = subClassMeta[field];
	if (!property) {
		property = superClassMeta[field];
	}
	return property;
}