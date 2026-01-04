import FinFlowIcon from '../../../public/assets/icons/FinFlow.svg';

const Logo = {
  render() {
    return `
      <div class="mx-auto w-[50px] h-[50px] tablet:w-[70px] tablet:h-[70px] relative">
        <div class="w-full h-full gradient-primary" 
              style=" -webkit-mask: url('${FinFlowIcon}') no-repeat center / contain;
                      mask: url('${FinFlowIcon}') no-repeat center / contain;"
        >
        </div>
      </div>
    `
  }
};

export default Logo;

