<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <h1>{{post.title}}</h1>
      <p>
        {{post.text}}
      </p>

      <div class="send-comment-wrapper">
        <textarea
          class="textarea"
          placeholder="Type your comment..."
          v-model="newComment"
        ></textarea>
        <button
          class="btn"
          type="button"
          @click="onSendNewComment()"
        >Send</button>
      </div>

      <div class="comments-wrapper">
        <span>Comments:</span>
        <p
          v-for="(comment, cIndex) in getCommentsByPost(post.id, comments)"
          :key="cIndex"
          class="comment-item"
        >
          <span class="comment-user-name">Some noname</span>
          <span class="comment-text">{{comment.text}}</span>
          <span>
            <span class="rm-button" @click="onRemoveComment(comment.id)">Remove</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',

  data() {
    return {
      ws: null,
      newComment: '',
      posts: [
        {
          id: 1,
          title: 'Some post',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tenetur aut mollitia atque delectus pariatur nam quod, necessitatibus, sunt reiciendis earum. Eligendi dolores laborum modi ea repellendus officia numquam vel!Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tenetur aut mollitia atque delectus pariatur nam quod, necessitatibus, sunt reiciendis earum. Eligendi dolores laborum modi ea repellendus officia numquam vel!Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tenetur aut mollitia atque delectus pariatur nam quod, necessitatibus, sunt reiciendis earum. Eligendi dolores laborum modi ea repellendus officia numquam vel!'
        }
      ],
      comments: [
        {
          id: 1,
          postId: 1,
          userId: 11,
          text: 'Это шедевр',
        },
        {
          id: 2,
          postId: 1,
          userId: 555,
          text: 'Это прекрасно',
        },
        {
          id: 3,
          postId: 1,
          userId: 333,
          text: 'Лучшее, что я видел',
        },
        {
          id: 4,
          postId: 1,
          userId: 777,
          text: 'Два чая этому автору',
        },
      ],
      scenario: {
        codeForbidding: 2,
        codeForCreateNewComment: 3,
      }
      
    }
  },

  mounted() {
    this.ws = new WebSocket('ws://echo.websocket.org/');
    this.ws.onopen = e => console.log(e);
    this.ws.onclose = () => console.log('Close');
    this.ws.onmessage = e => this.onWsMessage(e);
    this.ws.onerror = e => console.log(e);
  },

  methods: {
    getCommentsByPost(postId, comments) {
      return comments.filter(i => i.postId === postId);
    },

    createNewComment() {
      this.comments.unshift({
        id: Math.floor(Math.random() * 111),
        postId: 1,
        userId: Math.floor(Math.random() * 111),
        text: this.newComment,
      });

      this.newComment = '';
    },

    onRemoveComment(id) {
      this.ws.send(id);
    },

    onWsMessage(response) {
      if (response.data == this.scenario.codeForCreateNewComment && this.newComment) {
        this.createNewComment();
      } else {
        if (this.scenario.codeForbidding != response.data) {
          this.comments = this.comments.filter(i => i.id != response.data);
        }
      }
    },

    onSendNewComment() {
      if (!this.newComment) { return; }
      this.ws.send(this.scenario.codeForCreateNewComment);
    }
  },

  beforeDestroy() {
    this.ws.close();
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
.comment-item {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.comment-text {
  padding-left: 15px;
}

.comment-user-name {
  font-style: italic;
}

.textarea {
    width: 100%;
    max-width: 700px;
    min-height: 100px;
    border: none;
    box-shadow: 0px 0px 4px 0px silver;
    border-radius: 3px;
    font-size: 1em;
    margin-bottom: 5px;
    resize: none;
    padding: 10px;
    outline: none;
}

.rm-button {
  font-size: 0.8em;
  color: #9c25b0;
  cursor: pointer;
}

.comments-wrapper {
  margin-top: 20px;
}

.send-comment-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
