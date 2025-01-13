import { OnRpcRequestHandler, OnTransactionHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold, Divider, Heading, Section, Button, Icon } from '@metamask/snaps-sdk/jsx';

export const onTransaction: OnTransactionHandler = async ({ transaction, transactionOrigin, chainId }) => {
  // Extract transaction details
  // const { from, to, value, data } = transaction;

  return {
        content: (
          <Box>
            <Section>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>
                  <Bold>Request from:</Bold>
                </Text>
                <Text>
                  localhost:8080
                </Text>
              </Box>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>
                  <Bold>Interacting with:</Bold>
                </Text>
                <Text>
                  test4e
                </Text>
              </Box>

            </Section>
            {/* Request Details */}
            <Section>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>
                  <Bold>Amount:</Bold>
                </Text>
                <Text>
                  22 GEN
                </Text>
              </Box>
            </Section>
            {/* Amount */}

            {/* Max Estimated Fee */}
            <Section>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>
                  <Bold>Max. estimated fee:</Bold>
                </Text>
                <Text>
                  0.5 - 5.06 GEN
                </Text>
              </Box>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text alignment={'start'}>
                  GenLayer storage cost:
                </Text>
                <Text alignment={'end'}>
                  0.01 GEN
                </Text>
              </Box>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>Rollup storage cost:</Text>
                <Text>0.01 GEN</Text>
              </Box>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>Leader timeout:</Text>
                <Text>~20 minutes</Text>
              </Box>
              <Box
                direction="horizontal"
                alignment={'space-between'}
              >
                <Text>Validator timeout:</Text>
                <Text>~20 minutes</Text>
              </Box>
              {/* Appeal Options */}
              <Box>
                <Text>
                  Appeal Options <Icon name="warning" size="inherit" />
                </Text>
                <Box
                  direction="horizontal"
                  alignment="space-around"
                >
                  <Text>Minimum</Text>
                  <Text>Enhanced</Text>
                  <Text>Maximum</Text>
                </Box>
              </Box>
            </Section>

            {/* Note */}
            <Box>
              <Text>
                <Bold>Note:</Bold> Unused GEN will be returned to your account
                once the transaction is finalized.
              </Text>
            </Box>
            <Divider />

            {/* Show Advanced Options */}
            <Box>
              <Button name="bota_que_deu_certo">Go to Page 2</Button>
            </Box>
          </Box>
        ),
  }

  // Display a confirmation dialog to the user
  // return snap.request({
  //   method: 'snap_dialog',
  //   params: {
  //     type: 'confirmation',

  //   },
  // });
};

export const onRpcRequest: OnRpcRequestHandler = async ({
                                                          origin,
                                                          request,
                                                        }) => {
  // //@ts-ignore
  // const address= await window.ethereum.request({
  //   "method": "eth_requestAccounts",
  //   "params": [],
  // });
  //
  // const transaction = {
  //   from: address,
  //   to: "0x4C59B5C9663f0493225ab337BA96E844Ae003BDA",
  //   data: "0xDE0B6B3A7640000",
  //   value: 0x${0n.toString(16)},
  // };
  //
  // //@ts-ignore
  // const answer = await window.ethereum.request({
  //   method: "personal_sign",
  //   params: [address[0], "0xSomeDataToSign"],
  // });

  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              {/* Title */}
              <Box direction={'horizontal'} alignment={'center'}>
                <Heading size={'lg'}>
                  Transaction Request
                </Heading>
              </Box>
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Request from:</Bold>
                  </Text>
                  <Text>
                    localhost:8080
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Interacting with:</Bold>
                  </Text>
                  <Text>
                    0x9ef64eC8984A77E02f0cBf06fCFE59B50a99f94B
                  </Text>
                </Box>

              </Section>
              {/* Request Details */}
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Amount:</Bold>
                  </Text>
                  <Text>
                    22 GEN
                  </Text>
                </Box>
              </Section>
              {/* Amount */}

              {/* Max Estimated Fee */}
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Max. estimated fee:</Bold>
                  </Text>
                  <Text>
                    0.5 - 5.06 GEN
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text alignment={'start'}>
                    GenLayer storage cost:
                  </Text>
                  <Text alignment={'end'}>
                    0.01 GEN
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Rollup storage cost:</Text>
                  <Text>0.01 GEN</Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Leader timeout:</Text>
                  <Text>~20 minutes</Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Validator timeout:</Text>
                  <Text>~20 minutes</Text>
                </Box>
                {/* Appeal Options */}
                <Box>
                  <Text>
                    Appeal Options <Icon name="warning" size="inherit" />
                  </Text>
                  <Box
                    direction="horizontal"
                    alignment="space-around"
                  >
                    <Text>Minimum</Text>
                    <Text>Enhanced</Text>
                    <Text>Maximum</Text>
                  </Box>
                </Box>
              </Section>

              {/* Note */}
              <Box>
                <Text>
                  <Bold>Note:</Bold> Unused GEN will be returned to your account
                  once the transaction is finalized.
                </Text>
              </Box>
              <Divider />

              {/* Show Advanced Options */}
              <Box>
                <Button name="bota_que_deu_certo">Go to Page 2</Button>
              </Box>
            </Box>
          ),
        },
      });
    case 'hello2':
      const response = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              {/* Title */}
              <Box direction={'horizontal'} alignment={'center'}>
                <Heading size={'lg'}>
                  Transaction Request
                </Heading>
              </Box>
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Request from:</Bold>
                  </Text>
                  <Text>
                    localhost:8080
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Interacting with:</Bold>
                  </Text>
                  <Text>
                    0x9ef64eC8984A77E02f0cBf06fCFE59B50a99f94B
                  </Text>
                </Box>

              </Section>
              {/* Request Details */}
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Amount:</Bold>
                  </Text>
                  <Text>
                    22 GEN
                  </Text>
                </Box>
              </Section>
              {/* Amount */}

              {/* Max Estimated Fee */}
              <Section>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>
                    <Bold>Max. estimated fee:</Bold>
                  </Text>
                  <Text>
                    0.5 - 5.06 GEN
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text alignment={'start'}>
                    GenLayer storage cost:
                  </Text>
                  <Text alignment={'end'}>
                    0.01 GEN
                  </Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Rollup storage cost:</Text>
                  <Text>0.01 GEN</Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Leader timeout:</Text>
                  <Text>~20 minutes</Text>
                </Box>
                <Box
                  direction="horizontal"
                  alignment={'space-between'}
                >
                  <Text>Validator timeout:</Text>
                  <Text>~20 minutes</Text>
                </Box>
                {/* Appeal Options */}
                <Box>
                  <Text>
                    Appeal Options <Icon name="warning" size="inherit" />
                  </Text>
                  <Box
                    direction="horizontal"
                    alignment="space-around"
                  >
                    <Text>Minimum</Text>
                    <Text>Enhanced</Text>
                    <Text>Maximum</Text>
                  </Box>
                </Box>
              </Section>

              {/* Note */}
              <Box>
                <Text>
                  <Bold>Note:</Bold> Unused GEN will be returned to your account
                  once the transaction is finalized.
                </Text>
              </Box>
              <Divider />

              {/* Show Advanced Options */}
              <Box>
                <Button name="bota_que_deu_certo">Go to Page 2</Button>
              </Box>
            </Box>
          ),
        },
      });
      if(response){
        //@ts-ignore
        const address= await window.ethereum.request({
          "method": "eth_requestAccounts",
          "params": [],
        });
        //@ts-ignore
        const answer = await window.ethereum.request({
          method: "personal_sign",
          params: [address[0], "0xSomeDataToSign"],
        });
      }

    default:
      throw new Error('Method not found.');
  }
};
