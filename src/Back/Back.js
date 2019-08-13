import Chain from './Chain';

export default class Back {
  static Instance = new Back();

  static Chain = Chain;
  static setChains = chains => Back.Instance.setChains(chains);
  static set = name => Back.Instance.set(name);
  static dispatch = () => Back.Instance.dispatch();
  static pop = () => Back.Instance.pop();

  chains = {};
  current = null;

  setChains = chains => (this.chains = chains);
  set = name => (this.current = name);
  dispatch = () => {
    const chain = this.chains[this.current];
    chain && chain.dispatch();
  };
  pop = () => {
    const chain = this.chains[this.current];
    chain && chain.pop();
  };
}
