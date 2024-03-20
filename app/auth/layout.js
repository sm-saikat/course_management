import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";


const AuthLayout = async ({children}) => {
  const session = await getServerSession(authOptions);

  return session ? (
    redirect('/')
  ) : (
    <div>
      {children}
    </div>
  )
}

export default AuthLayout