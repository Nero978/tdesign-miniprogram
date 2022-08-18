import simulate from 'miniprogram-simulate';
import path from 'path';

describe('button', () => {
  const options = {
    less: true,
    rootPath: path.resolve(__dirname, '../..'),
  };
  const button = simulate.load(path.resolve(__dirname, '../button'), options);

  it(`:base`, async () => {
    const id = simulate.load({
      template: `<t-button block ghost disabled="{{disabled}}" class="btn"></t-button>`,
      data: {
        disabled: false,
      },
      methods: {},
      usingComponents: {
        't-button': button,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    const $btn = comp.querySelector('.btn >>> .t-button');
    $btn.dispatchEvent('tap');

    await simulate.sleep(10);

    comp.setData({ disabled: true });

    await simulate.sleep(10);

    $btn.dispatchEvent('tap');
  });

  it(`:opentype`, async () => {
    const handler = jest.fn();
    const id = simulate.load({
      template: `<t-button 
        class="btn"
        openType="{{openType}}" 
        bind:getuserinfo="handler" 
        bind:contact="handler"
        bind:getphonenumber="handler"
        bind:error="handler"
        bind:opensetting="handler"
        bind:launchapp="handler"
        bind:chooseavatar="handler"
      ></t-button>`,
      data: {
        openType: 'getUserInfo',
      },
      methods: {
        handler,
      },
      usingComponents: {
        't-button': button,
      },
    });
    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    const $btn = comp.querySelector('.btn >>> .t-button');

    $btn.dispatchEvent('getuserinfo');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(2);

    $btn.dispatchEvent('contact');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(4);

    $btn.dispatchEvent('getphonenumber');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(6);

    $btn.dispatchEvent('error');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(8);

    $btn.dispatchEvent('opensetting');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(10);

    $btn.dispatchEvent('launchapp');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(12);

    $btn.dispatchEvent('chooseavatar');
    await simulate.sleep(10);
    expect(handler).toHaveBeenCalledTimes(14);
  });

  it(':with group', () => {
    const buttonGroup = simulate.load(path.resolve(__dirname, '../../button-group/button-group'), options);
    const id = simulate.load({
      template: `<t-button-group type="primary" class="button-group">
        <t-button></t-button>
      </t-button-group>`,
      usingComponents: {
        't-button': button,
        't-button-group': buttonGroup,
      },
    });

    const comp = simulate.render(id);
    comp.attach(document.createElement('parent-wrapper'));

    const { classList } = comp.querySelector('.button-group >>> .t-button-group').dom;

    expect(/t-button-group/.test(classList)).toBeTruthy();
  });
});