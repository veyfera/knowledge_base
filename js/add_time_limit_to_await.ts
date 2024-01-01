import { Inject, Injectable } from 'injection-js';
import { Logger } from 'winston';

import { AmqpClient } from './amqp.client';
import { slackTodoBackendApiTx } from '../schemas/amqp/exchanges/slack-todo-backend.api.tx.exchange';
import { DeprecatedMessengerMessage } from '../../../libs/typescript/types/messengers/deprecated-messenger-message';
import { ReportQuestion } from '../types/report-types';

interface IntegrationParams {
    userId: string;
    teamId: string;
    reportId: string;
    questionId?: string;
}

interface IntegrationData {
    todo: string;
    status: string;
    listName: string;
}

@Injectable()
export class TodoBackendClient {
    constructor(
        @Inject('LOGGER') protected logger: Logger,
        protected amqpClient: AmqpClient
    ) {}

    //add decorator that quits function after 5 seconds
    public async getTodoAnswer(props: IntegrationParams): Promise<IntegrationData | false> {
        this.logger.info('Called getTodoAnswer method of TodoBackendClient', {
            props
        });

        const todoAnswer = this.amqpClient.request(slackTodoBackendApiTx.exchange, 'getReportIntegration', props);
        const timeout = resolveAfter(false, 5000);

        const res: IntegrationData | false = await Promise.race([todoAnswer, timeout]);
         //dont use await, use lasyAwait

        if (Object.keys(res).length === 0) {
        //if (Object.keys(todoAnswer).length === 0) {
            return false;
        }

        //return todoAnswer;
        return res;
    }

    public async getReportIntegration(props: IntegrationParams): Promise<Array<string> | false> {
        // does not have question id
        this.logger.info('Called getReportIntegration method of TodoBackendClient', {
            props
        });

        const integrationData: Array<string> = await this.amqpClient.request(slackTodoBackendApiTx.exchange, 'getReportIntegration', props);
        console.log('result of getting report integration: ', integrationData);

        if (Object.keys(integrationData).length === 0) {
            return false;
        }

        return integrationData;
    }

    //public async editTodoItems(message: DeprecatedMessengerMessage, integrationData: IntegrationParams) {
    public async editTodoItems(triggerId: string, integrationData: IntegrationParams): Promise<string | false> {
        this.logger.info('Called editTodoItems method of TodoBackendClient', {
            triggerId,
            integrationData
        });

        const res = await this.amqpClient.request(slackTodoBackendApiTx.exchange, 'editTodoItems', { triggerId, integrationData });
        console.log('result of editing todo items: ', res);

        if (Object.keys(res).length === 0) {
            return false;
        }

        return res as string;
    }
}

//function lazyAwait(pr, timeout) {
    //const startTime = Date.now();
    //while (!pr || Date.now() - startTime >= timeout) {
        //console.log('waiting')
    //}

    //return pr || false;
//}
//
const resolveAfter = (value, delay): Promise<false> =>
  new Promise(resolve => {
    //setTimeout(() => resolve(value, delay));
    setTimeout(() => {resolve(value)}, delay);
  });

//async function fulfillWithTimeLimit(timeLimit, task, failureValue){
    //let timeout;
    //const timeoutPromise = new Promise((resolve) => {
        //timeout = setTimeout(() => {
            //resolve(failureValue);
        //}, timeLimit);
    //});
    //const response = await Promise.race([task, timeoutPromise]);
    //if(timeout){ //the code works without this but let's be safe and clean up the timeout
        //clearTimeout(timeout);
    //}
    //return response;
//}

