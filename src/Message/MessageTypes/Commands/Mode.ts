import Message, { MessageParam, MessagePrefix } from '../../Message';
import { isChannel } from '../../../Toolkit/StringTools';
import UnknownChannelModeCharError from '../../../Errors/UnknownChannelModeCharError';
import { MessageParamDefinition, MessageType } from '../../MessageDefinition';

export type ModeAction = 'getList' | 'add' | 'remove';

export interface SingleMode {
	prefix?: MessagePrefix;
	action: ModeAction;
	letter: string;
	param?: string;
	known: boolean;
}

@MessageType('MODE')
export default class Mode extends Message<Mode, 'isChannel' | 'separate'> {
	@MessageParamDefinition({})
	target!: MessageParam;

	@MessageParamDefinition({
		rest: true,
		optional: true
	})
	modes!: MessageParam;

	get isChannel() {
		return isChannel(this.params.target, this._serverProperties.channelTypes);
	}

	separate(): SingleMode[] {
		const result: SingleMode[] = [];
		const modeRestParam = this.params.modes;
		if (!modeRestParam) {
			throw new Error('can\'t separate a channel mode request, just set actions');
		}
		const modeParams = modeRestParam.split(' ');
		const modes = modeParams.shift()!;
		let currentModeAction: ModeAction = 'add';
		for (const ch of modes) {
			let thisModeAction: ModeAction = currentModeAction;
			switch (ch) {
				case '+': {
					currentModeAction = 'add';
					break;
				}
				case '-': {
					currentModeAction = 'remove';
					break;
				}
				default: {
					let requiresParam = false;
					let known = true;
					if (this.isChannel) {
						if (this._serverProperties.supportedChannelModes.alwaysWithParam.includes(ch) || this._serverProperties.supportedChannelModes.prefix.includes(ch)) {
							requiresParam = true;
						} else if (this._serverProperties.supportedChannelModes.paramWhenSet.includes(ch)) {
							if (currentModeAction === 'add') {
								requiresParam = true;
							}
						} else if (this._serverProperties.supportedChannelModes.list.includes(ch)) {
							if (modeParams.length) {
								requiresParam = true;
							} else {
								thisModeAction = 'getList';
							}
						} else if (this._serverProperties.supportedChannelModes.noParam.includes(ch)) {
							// whatever
						} else {
							throw new UnknownChannelModeCharError(ch);
						}
					} else {
						// user modes never have a param
						// also, they don't break the whole command if invalid mode letters are given
						known = this._serverProperties.supportedUserModes.includes(ch);
					}
					if (requiresParam && !modeParams.length) {
						continue;
					}
					result.push({
						prefix: this._prefix,
						action: thisModeAction,
						letter: ch,
						param: requiresParam ? modeParams.shift() : undefined,
						known
					});
				}
			}
		}

		return result;
	}
}
