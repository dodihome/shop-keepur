import * as _ from 'lodash';
import { CreateBizDto, IBizConsumerView, UpdateBizDto, IInventoryItem } from './business.interface';
import { IUserProfile } from '../accounts/accounts.interface';
import Dodi from '../../utils/Dodi';

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

    updateBizInfo : async (biz: UpdateBizDto) => {
        const uri = '/api/bizz/update-info';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({updateDto: biz})
        });
        const res = await resRaw.json();
        return res;
    },

    updateTags : async (bizId: string, tags: string[], userId: string) => {
        const uri = '/api/bizz/update-tags';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bizId, tags, userId})
        });
        const res = await resRaw.json();
        return res;
    },

    updateInventoryItem : async (item: IInventoryItem, bizId: string, userId: string) => {
        const uri = '/api/bizz/update-inventory-item';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item, bizId, userId})
        });
        const res = await resRaw.json();
        return res;
    },

    deleteWishlistItem: async (itemId: string, bizId: string, userId: string) => {
        const uri = '/api/bizz/delete-wishlist-item';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId, bizId, userId})
        });
        const res = await resRaw.json();
        return res;
    },

    upVoteWishlistItem: async (itemId: string, bizId: string) => {
        const uri = '/api/bizz/upvote-wishlist-item';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId, bizId})
        });
        const res = await resRaw.json();
        return res;
    },

    downVoteWishlistItem: async (itemId: string, bizId: string) => {
        const uri = '/api/bizz/downvote-wishlist-item';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId, bizId})
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
        const location = Dodi.location();
        const uri = '/api/bizz/list?location=' + location;
        const resRaw = await fetch (uri);
        const res = await resRaw.json();
        return res;
    },

    latestUpdates: async () => {
        const location = Dodi.location();
        const uri = '/api/bizz/latest-updates?location=' + location;
        const resRaw = await fetch (uri);
        const res = await resRaw.json();
        return res;
    },

    getUniqueLocations : async () => {
        const uri = '/api/bizz/unique-city-states';
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

    inviteTeamMember : async (bizId : string, userId: string, name: string, email: string, role: string)=> {
        const uri = '/api/bizz/invite-team-member';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bizId, userId, name, email, role})
        });
        const res = await resRaw.json();
        return res;
    },

    rescindInvitation : async (token: string, userId: string) => {
        const uri = '/api/bizz/rescind-invite?token=' + token + '&userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    resendInvitation : async (token: string, userId: string) => {
        const uri = '/api/bizz/resend-invite?token=' + token + '&userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    getInvitations : async (bizId: string, userId: string) => {
        const uri = '/api/bizz/fetch-invitations?bizId=' + bizId + '&userId=' + userId;
        const resRaw = await fetch (uri);
        return (await resRaw.json());
    },

    canClaim (biz: IBizConsumerView, user: IUserProfile) {
        if (!biz) return false;

        if (!user) return false;
        if (biz.isClaimed) return false;

        return true;
    },

    canEdit (biz: IBizConsumerView, user: IUserProfile) {
        if (!biz) return false;

        if (!user) return false;
        if (!biz.isClaimed) {
            return true;
        } else {
            const found = _.find(biz.claims, (claim)=> {
                return (claim.state === 'ACCEPTED' && claim.claimedBy.userId === user.id);
            })
            return (found? true: false);
        }
    },

    canManagerTeam (biz: IBizConsumerView, user: IUserProfile) {
        if (!biz) return false;

        if (!user) return false;
        if (!biz.isClaimed) {
            return false;
        } else {
            const found = _.find(biz.claims, (claim)=> {
                return (claim.state === 'ACCEPTED' && claim.claimedBy.userId === user.id);
            })
            return (found? true: false);
        }
    },

    async searchByProduct (productId : string) {
        const userLocation = Dodi.location();
        
        const uri = '/api/bizz/search-by-product';
        const resRaw = await fetch (uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId, location: userLocation})
        });
        const res = await resRaw.json();

        return res;
    }
}

export default Bizz;