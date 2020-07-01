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
          ${USER_FRAGMENT}
        }
        goal {
          id
        }
        
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
        createdAt
        updatedAt
`;

export const POST_HISTORY_FRAGMENT = `
    fragment HistoryParts on Post {
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
          postRatio
        }
        likes {
          ${USER_FRAGMENT}
        }
        goal {
          id
        }
        dayTodo {
          id
        }
        
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
        
        createdAt
        updatedAt
    }
      
`;

export const GOAL_FRAGMENT = `
  fragment InformationParts on Goal {
      id
      user {
        ${USER_FRAGMENT}
      }
      goalText
      startDate
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
        stagePlanText
        startingDay
        endDay
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
      viewCounts
      keyWord
      goalCommentsCount
      goalReppliesCount
      excellentCounts
      luckyCounts
      favoriteCounts
      downloadCount
      cardColor
      cardPrivate
      complete
      completeDate
      sale
      salePrice
      mainImage
      introduceText
      target
      otherCosts
      otherCostsDesc
      purchase
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
    talk
    talk
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
      startDate
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
        stagePlanText
        startingDay
        endDay
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
      viewCounts
      keyWord
      goalCommentsCount
      goalReppliesCount
      excellentCounts
      luckyCounts
      favoriteCounts
      downloadCount
      cardColor
      cardPrivate
      complete
      completeDate
      sale
      salePrice
      mainImage
      introduceText
      target
      otherCosts
      otherCostsDesc
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
          startDate
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
            stagePlanText
            startingDay
            endDay
          }
          downloadCount
          category
          keyWord
          viewCounts
          goalCommentsCount
          goalReppliesCount
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
          sale
          salePrice
          mainImage
          introduceText
          target
          otherCosts
          otherCostsDesc
          purchase
          createdAt
          updatedAt
        }
        dayToDoes {
          id
          startDate
          startTime
          endDate
          endTime
          alrams {
            id
            time
            dayToDo{
              id
            }
          }
          memo
          user {
            id
          }
          toDoList
          complete
          color
          index
          originToDoId
          goal {
            id
            goalText
          }
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
      startDate
      startTime
      endDate
      endTime
      alrams {
        id
        time
        categoryId
        dayToDo{
          id
        }
      }
      memo
      user {
        id
      }
      toDoList
      complete
      color
      index
      originToDoId
      goal {
        id
        goalText
        sale
      }
      posts {
        id
        title
        postPrivate
      }
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

export const GOAL_COMMENT_FRAGMENT = `
  fragment GoalCommentParts on GoalComment {
      id
      text
      user {
        id
        nickname
        avatar
      }
      goal {
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

export const GOAL_REPPLY_FRAGMENT = `
  fragment GoalRepplyParts on GoalRepply {
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
