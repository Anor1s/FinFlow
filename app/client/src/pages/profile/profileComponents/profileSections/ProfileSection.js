import { SectionHeading, PageTemplate, ProfileItems, LogOutButton, DeleteAccountButton } from '../../index.js'

const ProfileSection = {
  render(user) {
    return `
      <div class="w-full flex flex-col gap-base laptop:h-fit">
        ${SectionHeading.render('Your profile')}
        <div class="h-full w-full gradient-secondary p-[16px] rounded-lg flex flex-col 
                    mobile:w-3/4 mobile:mx-auto gap-base tablet:gap-lg laptop:w-full laptop:flex-row"
        >
          <div class="flex flex-col laptop:flex-row gap-base w-full ">
            ${ProfileItems.render(user)}
          </div>

          <div class="flex flex-col gap-base laptop:flex-row w-full items-center mobile:justify-end">
            ${DeleteAccountButton.render()}
            ${LogOutButton.render()}
          </div>
        </div>
      </div>`
  },

  init() {
    DeleteAccountButton.init();
    LogOutButton.init();
  }
};

export default ProfileSection;