import Message, { MessageParam } from '../../Message';
import { MessageParamDefinition, MessageType } from '../../MessageDefinition';

@MessageType('004')
export default class Reply004ServerInfo extends Message<Reply004ServerInfo> {
	@MessageParamDefinition({})
	me!: MessageParam;

	@MessageParamDefinition({})
	serverName!: MessageParam;

	@MessageParamDefinition({})
	version!: MessageParam;

	@MessageParamDefinition({})
	userModes!: MessageParam;

	@MessageParamDefinition({})
	channelModes!: MessageParam;

	@MessageParamDefinition({
		optional: true
	})
	channelModesWithParam!: MessageParam;
}
