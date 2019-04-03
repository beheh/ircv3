import Message, { MessageParam } from '../../Message';
import { MessageParamDefinition, MessageType } from '../../MessageDefinition';

@MessageType('ISON')
export default class IsOnQuery extends Message<IsOnQuery> {
	@MessageParamDefinition({
		rest: true
	})
	nicks!: MessageParam;
}
