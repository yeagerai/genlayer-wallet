import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { useMetaMask, useMetaMaskContext, useRequestSnap } from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleRequestClick = async () => {
    // const client = createClient({
    //   chain: localnet,
    //   endpoint: 'http://127.0.0.1:4000/api',
    //   account: '0xf15acc0C943266bC638A9410F637a0b369a5fb4c',
    // });
    // client.connect(); add this later
    const [from] = (await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    })) as any;
    try {
      const response = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from,
            to: null,
            value: '0x0',
            data: '0xf90289b9027d23207b2022446570656e6473223a202270792d67656e6c617965723a7465737422207d0a0a66726f6d2067656e6c6179657220696d706f7274202a0a0a0a40676c2e636f6e74726163740a636c617373205573657253746f726167653a0a2020202073746f726167653a20547265654d61705b416464726573732c207374725d0a0a202020202320636f6e7374727563746f720a20202020646566205f5f696e69745f5f2873656c66293a0a2020202020202020706173730a0a20202020232072656164206d6574686f6473206d75737420626520616e6e6f74617465640a2020202040676c2e7075626c69632e766965770a20202020646566206765745f636f6d706c6574655f73746f726167652873656c6629202d3e20646963745b7374722c207374725d3a0a202020202020202072657475726e207b6b2e61735f6865783a207620666f72206b2c207620696e2073656c662e73746f726167652e6974656d7328297d0a0a2020202040676c2e7075626c69632e766965770a20202020646566206765745f6163636f756e745f73746f726167652873656c662c206163636f756e745f616464726573733a2073747229202d3e207374723a0a202020202020202072657475726e2073656c662e73746f726167655b41646472657373286163636f756e745f61646472657373295d0a0a2020202040676c2e7075626c69632e77726974650a20202020646566207570646174655f73746f726167652873656c662c206e65775f73746f726167653a2073747229202d3e204e6f6e653a0a202020202020202073656c662e73746f726167655b676c2e6d6573736167652e73656e6465725f6163636f756e745d203d206e65775f73746f72616765870e04617267730500',
          },
        ],
      });
      console.log(response);
    } catch (requestError) {
      console.log(requestError);
    }
  };
  return (
    <Container>
      <Heading>
        Welcome to <Span>Genlayer Snap</Span>
      </Heading>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={requestSnap}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Test Snap',
            description: '.',
            button: <SendHelloButton onClick={handleRequestClick} />,
          }}
          // disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
