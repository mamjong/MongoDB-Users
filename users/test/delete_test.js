const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	it('deletes a user using model instance', (done) => {
		joe.remove()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
			assert(user === null);
			done();
		});
	});

	it('deletes a user using class method', (done) => {
		// Commonly used to remove a bunch of records with some given criteria
		User.remove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
			assert(user === null);
			done();
		});
	});

	it('deletes a user using findOneAndRemove', (done) => {
		User.findOneAndRemove({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
			assert(user === null);
			done();
		});
	});

	it('deletes a user using findByIdAndRemove', (done) => {
		User.findByIdAndRemove(joe._id)
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
			assert(user === null);
			done();
		});
	});
});