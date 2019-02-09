import { Meteor } from 'meteor/meteor';

import { ReadReceipt } from '../../lib/ReadReceipt';

Meteor.methods({
	saveLivechatVisitorReadReceipt({ messageId, visitorToken, receiptStatus }) {

		if (!messageId) {
			throw new Meteor.Error('error-invalid-message', 'The required \'messageId\' param is missing.', { method: 'saveLivechatVisitorReadReceipt' });
		}
		if (!visitorToken) {
			throw new Meteor.Error('error-invalid-message', 'The required \'visitorToken\' param is missing.', { method: 'saveLivechatVisitorReadReceipt' });
		}

		const message = RocketChat.models.Messages.findOneById(messageId);

		if (!message) {
			throw new Meteor.Error('error-invalid-message', 'Invalid message', { method: 'saveLivechatVisitorReadReceipt' });
		}

		const visitor = RocketChat.models.LivechatVisitors.getVisitorByToken(visitorToken, { fields: { _id: 1 } });

		if (!visitor) {
			throw new Meteor.Error('error-invalid-visitor', 'Invalid visitor', { method: 'saveLivechatVisitorReadReceipt' });
		}

		ReadReceipt.markMessageAsReadBySender(message, message.rid, visitor._id, receiptStatus);

		return;
	},
});
