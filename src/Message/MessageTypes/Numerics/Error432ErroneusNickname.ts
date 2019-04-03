import Message, { MessageParam } from '../../Message';
import { MessageParamDefinition, MessageType } from '../../MessageDefinition';

// misspelt for historical reasons
@MessageType('432')
export default class Error432ErroneusNickname extends Message<Error432ErroneusNickname> {
	@MessageParamDefinition({})
	me!: MessageParam;

	@MessageParamDefinition({})
	nick!: MessageParam;

	@MessageParamDefinition({
		trailing: true
	})
	suffix!: MessageParam;

	protected isResponseTo(originalMessage: Message) {
		return originalMessage.command === 'NICK';
	}

	endsResponseTo(originalMessage: Message) {
		return true;
	}
}
