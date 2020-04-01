import { CreateBizDto } from './business.interface';

const Bizz = {
    addBiz : async (biz : CreateBizDto) => {
        const uri = '/api/bizz/create';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({createDto: biz})
        });
        const res = await resRaw.json();
        return res;
    },

    claimBiz : async (bizId : string, userId: string, role: string) => {
        const queryStr = [
            'bizId=' + bizId, 
            'userId=' + userId,
            'role=' + role
        ].join('&');
        const uri = '/api/bizz/claim?' + queryStr;
        const resRaw = await fetch (uri);
        const res = await resRaw.json();
        console.log({res});
        return res;
    },

    list : async () => {
        const uri = '/api/bizz/list';
        const resRaw = await fetch (uri);
        const res = await resRaw.json();
        return res;
    },

    consumerView: async (bizId: string) => {
        const uri = '/api/bizz/consumer-view?bizId=' + bizId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    managerView : async (bizId: string, userId: string) => {
        const uri = '/api/bizz/manager-view?bizId=' + bizId + '&userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    listPendingClaims : async (userId: string) => {
        const uri = '/api/bizz/list-pending-claims?userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    listUnclaimed : async (userId: string) => {
        const uri = '/api/bizz/list-unclaimed?userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    }
    
}

export default Bizz;