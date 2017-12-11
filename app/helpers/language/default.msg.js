module.exports = {
    common: {
        error: {
            noToken: {
                msg: 'No token provided'
            },
            missingRequiredParameter: {
                msg: 'The request is missing a required parameter'
            },
            invalidClient: {
                msg: 'The request is invalid client data'
            },
            dataNotFound: {
                msg: "Data not found"
            },
            payLoadErr: {
                msg: "Payload error"
            },
            accessDenied: {
                msg: "Access denied"
            },
            delete: {
                msg: "Record deleted"
            },
            unidentifiedErr: {
                msg: "Something went wrong"
            },
            unique: {
                msg: "should be unique"
            },
            updatePermission: {
                msg: "User don't have permission to update the data"
            },
            deletePermission: {
                msg: "User don't have permission to delete the data"
            },
            badRequest: {
                msg: "Bad request somthing went wrong"
            },
            petSizeUnique: {
                msg: "petSize is already exists for this petType"
            },
            globalBannerLimit: {
                msg: 'You have reached globalBanner limit.limit is'
            },
            invalidDeviceToken: {
                msg: 'Invalid Device Token'
            },
            faq: {
                msg: "Repeated faq"
            },
            userNotAvailable : {
                msg: "User not available"
            }

        },
        success: {
            fileImport: {
                msg: "File imported successfully"
            },
            changeOrder: {
                msg: "order changed successfully"
            },
            notificationDelete: {
                msg: 'notification removed successfully'
            },
            notificationsDelete: {
                msg: 'notifications removed successfully'
            },
        }
    },
    user: {
        error: {
            login: {
                msg: 'Invalid email or password'
            },
            alreadyRegister: {
                msg: 'This Email Address is already registered'
            },
            password: {
                msg: 'incorrect old password'
            },
            notFound: {
                msg: 'user not found'
            },
            namePassCommonError: {
                msg: 'Incorrect username or password'
            },
            deviceTypeError: {
                msg: 'Invalid device type'
            },
            mobileUnique: {
                msg: 'This Mobile Number is already registered'
            },
            noFollowUser: {
                msg: 'There is no user to unfollowed'
            },
            updateProfile: {
                msg: "email and mobileNo is read-only"
            },
            noUsers: {
                msg: "No users available"
            },
            misMatchPassword: {
                msg: "misMatch new password"
            },
            notRegistered: {
                msg: "mobileNo is not registered so please enter existing mobile number"
            },
            unique:{
                msg: " is already used"
            }

        },
        success: {
            register: {
                msg: 'User is registered successfully'
            },
            accountActivation: {
                msg: "Your account is successfully activated"
            },
            logout: {
                msg: "Logout successfull"
            },
            otpSend: {
                msg: "OTP sent successfully"
            },
            otpSuccess: {
                msg: "OTP verified successfully"
            },
            otpReSend: {
                msg: "OTP resent successfully"
            },
            follow: {
                msg: "You followed the user"
            },
            alreadyFollow: {
                msg: "You have already followed the user"
            },
            unFollow: {
                msg: "You unfollowed the user"
            },
            likePost: {
                msg: "You like the post"
            },
            unLikePost: {
                msg: "You unlike the post"
            },
            commentPost: {
                msg: "Your comment is posted"
            },
            following: {
                msg: 'There is no following data'
            },
            follower: {
                msg: 'There is no followers data'
            },
            gallery: {
                msg: 'There is no gallery data '
            },
            preferredCity: {
                msg: 'preferredCity is changed successfully'
            },
            password: {
                msg: 'password changed sucessfully'
            }
        }
    },
    project: {
        error: {
            login: {
                msg: 'Invalid email address or password'
            },
            noManagementPeriod: {
                msg: 'Previous management period not found'
            },
            noDataForMP: {
                msg: 'Data not found for previous management period'
            },
        },
        success: {
            register: {
                msg: 'You are successfully registered'
            }
        },
    },
    otp: {
        error: {
            expired: {
                msg: 'OTP is expired'
            },
            wrong: {
                msg: 'wrong OTP'
            }
        }
    },
    bubHub: {
        success: {
            postDelete: {
                msg: 'Post deleted successfully'
            },
            postEdit: {
                msg: 'Post edited successfully'
            },
            likepost: {
                msg: 'Post liked successfully'
            },
            unlikepost: {
                msg: 'Post unliked successfully'
            },
            likes: {
                msg: '0 likes'
            },
            freqTimeUpdated: {
                msg: 'Love frequency time updated successfully'
            },
            likePostNotification: {
                msg: 'has liked your post'
            },
            commentPostNotification: {
                msg: 'has commented on your post'
            },
            commentMention:{
                msg: 'has mentioned you in a Bub Hub post'
            },
            postMention:{
                msg: 'has mentioned you in a Bub Hub post'
            }
        },
        error: {
            loveGallery: {
                msg: 'There is no loved posts'
            },
            alreadyLikedPost: {
                msg: 'Post is already liked by user'
            },
            noLikesForPost: {
                msg: 'No likes for selected post'
            },
            noCommentForPost: {
                msg: 'No comments for selected post'
            },
            noAbuseForPost: {
                msg: 'No abuse for selected post'
            },
            invalidPost: {
                msg: 'Post does not exist'
            },
        }
    },
    reportAbuse: {
        success: {
            abusePost: {
                msg: 'Thank you for reporting this post'
            }
        },
        error: {
            abusePost: {
                msg: 'You have already reported this post'
            }
        }
    },
    petNews: {
        error: {
            bannerLimit: {
                msg: 'You have reached banner limit.limit is'
            },
            bookMarkAlready: {
                msg: 'You have already bookmarked this news'
            },
        },
        success: {
            bookMark: {
                msg: 'News is bookmarked successfully'
            },
            unBookMark: {
                msg: 'News is unBookmarked successfully'
            },
            deletePetNews: {
                msg: 'news deleted sucessfully'
            }
        }
    },
    bubTalk: {
        error: {

        },
        success: {
            commentEdit: {
                msg: 'comment edited successfully'
            },
            postEdit: {
                msg: 'post edited successfully'
            },
            commentDelete: {
                msg: 'comment deleted successfully'
            },
            postDelete: {
                msg: 'post deleted successfully'
            },
            threadDelete: {
                msg: 'thread deleted successfully'
            },
            replayOnThreadNotification: {
                msg: 'has replied to your thread in'
            },
            commentOnreplayNotification: {
                msg: 'has commented on your thread in'
            },
            threadMention:{
                msg: 'has mentioned you in Bub Forum thread'
            },
            replayMention:{
                msg: 'has mentioned you in Bub Forum reply'
            },
            replayCommentMention:{
                msg: 'has mentioned you in Bub Forum comment'
            },
            startThread: {
                msg: 'has started a new thread in'
            }
        }
    },
    petDirectoryBusiness: {
        error: {
            rating: {
                msg: 'user has alreday rated for this business'
            },
            subCategoryUnique: {
                msg: 'subCategory is already exist for this category'
            },
            categoryUnique: {
                msg: 'category is already exist for this country'
            },
            importSkippedRecords: {
                msg: 'Some records are skipped'
            },
            favourites: {
                msg: 'business is alreday added to favourites'
            }
        },
        success: {
            rating: {
                msg: 'your rating is submitted sucessfully'
            },
            editBusiness: {
                msg: 'business updated sucessfully'
            },
            deleteBusiness: {
                msg: 'business deleted sucessfully'
            },
            importCorrectRecords: {
                msg: 'All records are correctProceed to import'
            },
            favourites: {
                msg: 'business is added to favourites'
            },
            removeFavourites: {
                msg: 'business is removed from favourites'
            }
        }
    },
    DrBubs: {
        error: {
            parentUnique: {
                msg: 'PetType is already exists for this Category'
            },
            unique: {
                msg: 'PetType Name is already exists'
            },
            uniqueStep: {
                msg: 'Steps are already defined for this petType'
            },
            bookMarkAlready: {
                msg: 'You have already bookmarked this article'
            },
            bannerLimit: {
                msg: 'You have reached banner limit.limit is'
            },
            missingMedia: {
                msg: 'Image or video is required to post an article'
            }
        },
        success: {
            bookMark: {
                msg: 'Article is bookmarked successfully'
            },
            unBookMark: {
                msg: 'Article is unBookmarked successfully'
            },
            delete: {
                msg: 'Record deleted'
            }
        }
    },
    notifications: {
        success: {
            notificationRead: {
                msg: 'Notification status changed to read'
            },
            startFollow: {
                msg: ' started following you'
            },
            startThread: {
                msg: 'has started a new thread in'
            }
        }
    }
};