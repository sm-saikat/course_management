import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileForm from "@/components/ProfileForm";
import { getServerSession } from "next-auth";


const Profile = async () => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <div className='w-full pt-10'>
            <div className="w-full m-auto max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <ProfileForm data={user} />
            </div>
        </div>
    )
}

export default Profile