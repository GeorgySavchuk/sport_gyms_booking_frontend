export const getUserInfo = async () => {
    const res = await fetch('/user/my-info', {cache: 'no-store'});
    const data: {id: number; username: string} = (await res.json()) || {};

    return data;
}