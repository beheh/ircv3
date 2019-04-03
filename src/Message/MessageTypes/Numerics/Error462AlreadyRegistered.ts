import Message, { MessageParam } from '../../Message';
import { MessageParamDefinition, MessageType } from '../../MessageDefinition';

@MessageType('462')
export default class Error462AlreadyRegistered extends Message<Error462AlreadyRegistered> {
	@MessageParamDefinition({})
	me!: MessageParam;

	@MessageParamDefinition({
		trailing: true
	})
	suffix!: MessageParam;
}
