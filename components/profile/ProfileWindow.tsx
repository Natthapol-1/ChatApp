'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/generated/prisma/client';
import editUserInfo from '@/app/actions/editUserInfo';
import { ProfileSchema, ProfileInput } from '@/lib/validations';
import { UserCircle, Mail, Save } from 'lucide-react'; // Pro icons

export default function ProfileWindow({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  const onSubmit = async (data: ProfileInput) => {
    try {
      await editUserInfo(user.id, data.email, data.name);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Something went wrong on the server.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-[#161b22] border border-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600/10 p-4 rounded-full mb-4">
            <UserCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <p className="text-gray-400 text-sm">
            Update your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-gray-500" /> Username
            </label>
            <input
              {...register('name')}
              placeholder="Your display name"
              className={`block w-full px-4 py-3 bg-[#0d1117] border rounded-xl text-white transition-all outline-none
                ${
                  errors.name
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs italic mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" /> Email Address
            </label>
            <input
              {...register('email')}
              placeholder="email@example.com"
              className={`block w-full px-4 py-3 bg-[#0d1117] border rounded-xl text-white transition-all outline-none
                ${
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20 mt-4"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
