import React, {Component} from 'react';
import {Wrap, Tab, Stack, Modal} from 'react-native-animated-navigation';
import FirstFirst from '../scenes/Main/First/First';
import FirstSecond from '../scenes/Main/First/Second';
import SecondFirst from '../scenes/Main/Second/First';
import SecondSecond from '../scenes/Main/Second/Second';
import Third from '../scenes/Main/Third';
import Fourth from '../scenes/Main/Fourth';
import Preloader from '../scenes/Preloader/Main';
import Popup from '../scenes/Modals/Popup';
import Tabs from '../components/Tabs';
import navigation from '.';

class MainNavigation extends Component {
  componentDidMount() {
    navigation.on('focus:main/first', () => navigation.go('first'));
    navigation.on('focus:main/second', () => navigation.go('second'));
  }

  onTabPress = async name => {
    switch (name) {
      case 'first': {
        await navigation.go('main', 'first');
        break;
      }
      case 'second': {
        await navigation.go('main', 'second');
        break;
      }
      case 'third': {
        await navigation.go('main', 'third');
        break;
      }
      case 'fourth': {
        await navigation.go('main', 'fourth');
        break;
      }
    }
  };

  render() {
    const {main} = navigation.navigators;

    return (
      <>
        <Tab.Wrap navigator={'main'} scene={'first'}>
          <Stack.Wrap navigator={'first'} scene={'first'}>
            {props => <FirstFirst {...props} />}
          </Stack.Wrap>
          <Stack.Wrap navigator={'first'} scene={'second'}>
            {props => <FirstSecond {...props} />}
          </Stack.Wrap>
        </Tab.Wrap>
        <Tab.Wrap navigator={'main'} scene={'second'}>
          <Stack.Wrap navigator={'second'} scene={'first'}>
            {props => <SecondFirst {...props} />}
          </Stack.Wrap>
          <Stack.Wrap navigator={'second'} scene={'second'}>
            {props => <SecondSecond {...props} />}
          </Stack.Wrap>
        </Tab.Wrap>
        <Tab.Wrap navigator={'main'} scene={'third'}>
          {props => <Third {...props} />}
        </Tab.Wrap>
        <Tab.Wrap navigator={'main'} scene={'fourth'}>
          {props => <Fourth {...props} />}
        </Tab.Wrap>

        <Tabs>
          <Tabs.Item
            active={main.scenes.first.active.value}
            title={'first'}
            onPress={() => this.onTabPress('first')}
          />
          <Tabs.Item
            active={main.scenes.second.active.value}
            title={'second'}
            onPress={() => this.onTabPress('second')}
          />
          <Tabs.Item
            active={main.scenes.third.active.value}
            title={'third'}
            onPress={() => this.onTabPress('third')}
          />
          <Tabs.Item
            active={main.scenes.fourth.active.value}
            title={'fourth'}
            onPress={() => this.onTabPress('fourth')}
          />
        </Tabs>

        <Modal.Wrap overlay transparent navigator={'modals'} scene={'popup'}>
          {props => <Popup {...props} />}
        </Modal.Wrap>
      </>
    );
  }
}

export default class Main extends Component {
  render() {
    return (
      <Wrap>
        <MainNavigation />
        <Preloader
          active={navigation.navigators.preloader.scenes.main.active.value}
        />
      </Wrap>
    );
  }
}
