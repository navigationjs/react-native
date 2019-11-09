import React, {Component} from 'react';
import {Wrap, Tab} from 'react-native-animated-navigation';
import First from '../scenes/Main/First';
import Second from '../scenes/Main/Second';
import Third from '../scenes/Main/Third';
import Fourth from '../scenes/Main/Fourth';
import Preloader from '../scenes/Preloader/Main';
import Tabs from '../components/Tabs';
import navigation from '.';

class MainNavigation extends Component {
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
          {props => <First {...props} />}
        </Tab.Wrap>
        <Tab.Wrap navigator={'main'} scene={'second'}>
          {props => <Second {...props} />}
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
