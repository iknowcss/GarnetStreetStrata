import { MockNotificationGateway } from './impl/MockNotificationGateway';
import { MockResidentGateway } from './impl/MockResidentGateway';

const notificationGateway = new MockNotificationGateway();
const residentGateway = new MockResidentGateway();

export { notificationGateway, residentGateway };
