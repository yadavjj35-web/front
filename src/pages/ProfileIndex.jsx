import React from 'react';
import Profile from './Profile';
import ProfileChangePassword from './ProfileChangePassword';

export default function ProfileIndex() {
  return (
    <div>
      <Profile />
      <div className="mt-6">
        <ProfileChangePassword />
      </div>
    </div>
  );
}
