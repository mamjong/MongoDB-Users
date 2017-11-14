const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe', likes: 0 });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	// Model instance update methods

	it('updates a user using the set n save method', (done) => {
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
	});

	it('updates a user using a model instance', (done) => {
		assertName(joe.update({name: 'Alex'}), done)
	});

	// Model class update methods

	it('updates a user using class method', (done) => {
		assertName(
			User.update({ name: 'Joe' }, { name: 'Alex' }),
			done
		);
	});

	it('updates a user using findOneAndUpdate', (done) => {
		assertName(
			User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
			done
		);
	});

	it('updates a user using findByIdAndUpdate', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
			done
		);
	});

	it('increments a user his postCount by 1', (done) => {
		User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
			.then(() => User.findOne({ name: 'Joe' })).then((user) => {
			assert(user.likes === 1);
			done();
		});
	});
});