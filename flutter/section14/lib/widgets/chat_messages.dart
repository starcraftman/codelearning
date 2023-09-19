import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:section14/widgets/message_bubble.dart';

class ChatMessages extends StatelessWidget {
  const ChatMessages({super.key});

  @override
  Widget build(BuildContext context) {
    final fireStream = FirebaseFirestore.instance
        .collection('chat')
        .orderBy('createdAt', descending: true)
        .snapshots();
    return StreamBuilder(
        stream: fireStream,
        builder: (BuildContext ctx, chatSnapshots) {
          if (chatSnapshots.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (!chatSnapshots.hasData || chatSnapshots.data!.docs.isEmpty) {
            return const Center(child: Text("No messages found."));
          }

          if (chatSnapshots.hasError) {
            return const Center(child: Text("Error on load."));
          }

          final loadedMsgs = chatSnapshots.data!.docs;
          final authenticatedUser = FirebaseAuth.instance.currentUser!;

          return ListView.builder(
            padding: const EdgeInsets.only(bottom: 40, left: 13, right: 13),
            reverse: true,
            itemCount: loadedMsgs.length,
            itemBuilder: (context, index) {
              final chatMessage = loadedMsgs[index].data();
              final nextChatMessage = index + 1 < loadedMsgs.length
                  ? loadedMsgs[index + 1].data()
                  : null;

              final nextMessageUserId = nextChatMessage != null ? nextChatMessage['userId'] : null;
              final nextUserIsSame = nextMessageUserId == chatMessage['userId'];

              if (nextUserIsSame) {
                return MessageBubble.next(
                  message: chatMessage['text'],
                  isMe: authenticatedUser.uid == chatMessage['userId']
                );
              } else {
                return MessageBubble.first(
                  userImage: chatMessage['userImage'],
                  username: chatMessage['username'],
                  message: chatMessage['text'],
                  isMe: authenticatedUser.uid == chatMessage['userId']
                );
              }
            },
          );
        });
  }
}
