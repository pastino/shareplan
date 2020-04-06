export const USER_FRAGMENT = `
        id
        userId
        avatar
        nickname
        dateOfBirth
        gender
        snsLogin
        bio 
        clocks {
          id
          todayYear
          todayMonth
          todayDate
          wakeUpTime
          createdAt
          updatedAt
        }    
`;

export const POST_FRAGMENT = `
        id
        title
        caption
        postPrivate
        user {
          ${USER_FRAGMENT}
        }
        files {
          id
          url
        }
        likes {
          id
          user {
            ${USER_FRAGMENT}
          }
        }
        goal {
          id
        }
        isLiked
        likeCount
        assortment
        goalInformation{
          id
        }
        goalHistory{
          id
        }
        comments {
          id
          text
          user {
            id
            nickname
            avatar
          }
          createdAt
          updatedAt
          repply {
            id
            text
            user {
              id
              nickname
              avatar
            }
            createdAt
            updatedAt
          }
        }
        commentCounts
        repplyCounts
        createdAt
        updatedAt
`;

export const GOAL_FRAGMENT = `
  fragment InformationParts on Goal {
    id
    user {
      id
      avatar
      nickname
    }
    posts{
      id
      createdAt
      postPrivate
    }
    goalInformations {
      id
      information {
        ${POST_FRAGMENT}
      }
      createdAt
      updatedAt
      }
      goalHistories { 
        id
      history {
        ${POST_FRAGMENT}
      }
      createdAt
      updatedAt
      }
      detailPlans { 
        id
      }
      excellents{
        id
        nickname
        avatar
      }
      favorites{
        id
        nickname
        avatar
      }
      luckies {
        id
        nickname
        avatar
      }
      excellentCounts
      luckyCounts
      favoriteCounts
      complete
      completeDate
      createdAt
      updatedAt
  }
`;

export const COMMENT_FRAGMENT = `
  fragment CommentParts on Comment {
      id
      text
      user {
        id
        nickname
        avatar
      }
      post {
        id
      }
      repply {
        id
        text
        user {
          id
          avatar
          nickname
        }
        comment {
          id
        }
        createdAt
        updatedAt
        }
      createdAt
      updatedAt
  }
`;

export const REPPLY_FRAGMENT = `
  fragment RepplyParts on Repply {
      id
      text
      user {
        id
        avatar
        nickname
      }
      comment {
        id
      }
      createdAt
      updatedAt
  }
`;

export const LIKE_FRAGMENT = `
  fragment LikeParts on Like {
    id
    user {
      id 
      nickname
      avatar
    }
    post { 
      id
    }
    createdAt
    updatedAt
  }
`;

export const CLOCK_FRAGMENT = `
  fragment ClockParts on Clock{
        id
        user {
          ${USER_FRAGMENT}
        }
        todayYear
        todayMonth
        todayDate
        wakeUpTime
  }    
`;

export const TALK_FRAGMENT = `
  fragment TalkParts on Talk {
    id
    user {
      ${USER_FRAGMENT}
    }
    talkText
    talkCommentCounts
    talkRepplyCounts
    talkComments {
      id
      user {
        id
        avatar
        nickname
      }
      talk {
        id
      }
      text
      talkRepplies {
        id
        user {
          id
          avatar
          nickname
        }
        talkComment {
          id
        }
        text
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    talkRepplies {
      id
      user {
        id
        nickname
        avatar
      }
      talkComment {
        id
      }
      talk {
        id
      }
      text
      createdAt
      updatedAt
    }
    division
    createdAt
    updatedAt
  }
`;

export const TALK_COMMENT_FRAGMENT = `
  fragment TalkComments on TalkComment {
      id
      user {
        id
        avatar
        nickname
      }
      talk {
        id
      }
      text
      talkRepplies {
        id
        talkComment {
          id
        }
        text
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
  }
`;

export const TALK_REPPLY_FRAGMENT = `
  fragment RepplyParts on TalkRepply {
      id
      user {
        id
        nickname
        avatar
      }
      talkComment {
        id
      }
      talk {
        id
      }
      text
      createdAt
      updatedAt
  }
`;

export const FULL_CARD_FRAGMENT = `
  fragment GoalParts on Goal {
      id
      user {
        ${USER_FRAGMENT}
      }
      goalText
      dDay
      posts {
        id
        createdAt
        postPrivate
        assortment
      }
      goalInformations {
        id
        information {
          ${POST_FRAGMENT}
        }
      }
      goalHistories {     
        id
        history {
          ${POST_FRAGMENT}
        }
      }
      detailPlans {
        id
      }
      category
      detailCategory
      excellents{
        id
        nickname
        avatar
      }
      favorites{
        id
        nickname
        avatar
      }
      luckies {
        id
        nickname
        avatar
      }
      excellentCounts
      luckyCounts
      favoriteCounts
      cardColor
      cardPrivate
      complete
      completeDate
      createdAt
      updatedAt
    }
`;

export const SEE_USER_FRAGMENT = `
    fragment UserParts on User {
        id
        avatar
        dateOfBirth
        userId
        nickname
        gender
        snsLogin
        postCounts
        goalCounts
        bio
        talks {
          id
          user {
            ${USER_FRAGMENT}
          }
          talkText
          division
          createdAt
          updatedAt
        }
        clocks {
          id
          user {
            ${USER_FRAGMENT}
          }
          todayYear
          todayMonth
          todayDate
          wakeUpTime
        }
        goals {
          id
          user {
            id
            nickname
            avatar
          }
          posts{
            id
          }
          goalText
          dDay
          goalInformations {
            id
            information {
              ${POST_FRAGMENT}
            }
          }
          goalHistories {     
            id
            history {
              ${POST_FRAGMENT}
            }
          }
          detailPlans {
            id
          }
          category
          detailCategory
          cardColor
          complete
          completeDate
          cardPrivate
          excellents{
            id
            nickname
            avatar
          }
          favorites{
            id
            nickname
            avatar
          }
          luckies {
            id
            nickname
            avatar
          }
          createdAt
          updatedAt
        }
        dayToDoes {
          id
          monthDay
          user {
            id
          }
          toDoList
          complete
          importEvent
          createdAt
          updatedAt
        }
        following {
          id
          avatar
          dateOfBirth
          nickname
          gender
          postCounts
          goalCounts
        }
        followers {
          id
          avatar
          dateOfBirth
          nickname
          gender
          postCounts
          goalCounts
        }
        posts {
          id
          title
          caption
          assortment
          postPrivate
          goalInformation{
            id
          }
          user {
            id
            avatar
            nickname
          }
          files {
            id
            url
          }
        
          likes {
            id
          }
          comments {
            id
          }
          createdAt
          updatedAt
        }
        likes {
          id
        }
        comments {
          id
          text
          user {
            id
          }
          post {
            id
          }
        }
        rooms {
          id
          participants {
            id
          }
          messages {
            id
          }
        }
        feedOrdering
        createdAt
        updatedAt
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            id
            userId
            nickname
            dateOfBirth
            gender
            bio     
            posts {
                id
                title
                caption
            }
            likes {
                id
            }
            comments {
                id
                text
            }
        }
        messages {
            id
            text
            from {
                ${USER_FRAGMENT}
            }
            to {
                ${USER_FRAGMENT}
            }
        }
    }
`;

export const DAYTODO_FRAGMENT = `
  fragment DayToDoParts on DayToDo {
        id
        monthDay
        user {
          id
        }
        toDoList
        complete
        importEvent
        createdAt
        updatedAt
  }
`;

export const SUGGESTION_FRAGMENT = `
fragment SuggestionParts on Suggestion {
    id
    user {
      id
      userId
      nickname
      avatar
      gender
      dateOfBirth
    }
    text
    image
    createdAt
    updatedAt
  }
`;
