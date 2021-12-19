import { initState, chatsReduser } from "../reducer";
import { createChat } from "../../../components/utility";
import { addChat, removeChat } from "../actions";



describe('chatsReduser', () => {

  it('вызов редьюсера без экшена вернет initState', () => {
    const result = chatsReduser();

    expect(result).toEqual(initState);
  });

  it('чат добавляется в конец списка', () => {
    const result = chatsReduser(undefined, addChat(createChat('chat-01')));

    expect(result).toEqual({
      chats: [
        {
          name: 'chat-01',
        }
      ]
    });
  });

  it('чат удаляется из списка', () => {
    const chats = Array.from({
      length: 5,
    }).map((_, index) => createChat(`chat-${index + 1}`))

    const chatsResult = Array.from({
      length: 4,
    }).map((_, index) => createChat(`chat-${index + 1}`))

    const result = chatsReduser({
      chats,
    }, removeChat('chat-5'));

    expect(result).toEqual({
      chats: chatsResult
    })
  })

})
