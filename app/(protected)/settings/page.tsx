import { auth, signOut } from "@/auth";
const SettingPage = async () => {
    const session = await auth();

    return (
        <div>
            <div>{JSON.stringify(session)}</div>
            <form
                action={async () => {
                    "use server";
                    await signOut({redirectTo: "/auth/login"});
                }}
            >
                <button type="submit">Sign out</button>
            </form>
        </div>
    );
};

export default SettingPage;
