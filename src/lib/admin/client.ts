
const Admin = {
    listPendingClaims : async (userId: string) => {
        const uri = '/api/admin/list-pending-claims?userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    listUnclaimed : async (userId: string) => {
        const uri = '/api/admin/list-unclaimed?userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    acceptClaim : async (claimId: string, userId: string) => {
        const uri = '/api/admin/accept-claim';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({claimId, userId})
        });
        return (await resRaw.json());
    },

    rejectClaim : async (claimId: string, userId: string, reason: string) => {
        const uri = '/api/admin/reject-claim';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({claimId, userId, reason})
        });
        return (await resRaw.json());
    }
}

export default Admin;