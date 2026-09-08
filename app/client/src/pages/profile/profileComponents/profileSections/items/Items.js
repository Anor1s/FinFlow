const ProfileItems = {

  render(user) {
    const username = user?.username || 'n/a';
    const email = user?.email || 'n/a';
    const joinedDate = user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : 'n/a';

    return `
       <div class="flex flex-col gap-sm w-full">
          <span class="text-lg text-text-primary my-auto">Login</span>
          <span class="text-base text-text-tertiary bg-surface h-button flex items-center px-[16px] rounded w-full">
            ${username}
          </span>
        </div>
        
        <div class="flex flex-col gap-sm w-full">
          <span class="text-lg text-text-primary my-auto">Email</span>
          <span class="text-base text-text-tertiary bg-surface h-button flex items-center px-[16px] rounded w-full">
            ${email}
          </span>
        </div>

        <div class="flex flex-col gap-sm w-full">
          <span class="text-lg text-text-primary my-auto">Joined Date</span>
          <span class="text-base text-text-tertiary bg-surface h-button flex items-center px-[16px] rounded w-full">
            ${joinedDate}
          </span>
        </div>
    `;
  }

};

export default ProfileItems;