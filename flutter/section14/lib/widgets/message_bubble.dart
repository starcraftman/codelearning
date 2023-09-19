import 'package:flutter/material.dart';

class MessageBubble extends StatelessWidget {
  final String message;
  final String? userImage;
  final String? username;
  final bool isMe;
  final bool isFirstInSequence;

  const MessageBubble.first({
    super.key,
    required this.userImage,
    required this.username,
    required this.message,
    required this.isMe,
  }) : isFirstInSequence = true;

  const MessageBubble.next({
    super.key,
    required this.message,
    required this.isMe,
  }) : userImage = null, username = null, isFirstInSequence = false;

  Widget userImageSection(BuildContext ctx) {
    final theme = Theme.of(ctx);

    assert(userImage != null);
    return Positioned(
      top: 15,
      right: isMe ? 0: null,
      child: CircleAvatar(
        radius: 23,
        backgroundImage: NetworkImage(
          userImage!
        ),
        backgroundColor: theme.colorScheme.primary.withAlpha(180),
      )
    );
  }

  Widget messageUsername(BuildContext ctx) {
    return Padding(
      padding: const EdgeInsets.only(left: 13, right: 13),
      child: Text(
        username!,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.black87,
        )
      ),
    );
  }

  Widget messageBox(BuildContext ctx) {
    final theme = Theme.of(ctx);
    const circleRadius = 12.0;
    return Container(
      decoration: BoxDecoration(
        color: isMe ? Colors.grey[300] : theme.colorScheme.secondary.withAlpha(200),
        // Only show the message bubble's "speaking edge" if first in the chain.
        // Whether the "speaking edge" is on the left or right depends
        // on whether or not the message bubble is the current user.
        borderRadius: BorderRadius.only(
          topLeft: !isMe && isFirstInSequence ? Radius.zero : const Radius.circular(circleRadius),
          topRight: isMe && isFirstInSequence ? Radius.zero : const Radius.circular(circleRadius),
          bottomLeft: const Radius.circular(circleRadius),
          bottomRight: const Radius.circular(circleRadius)
        )
      ),

      constraints: const BoxConstraints(maxWidth: 200),

      padding: const EdgeInsets.symmetric(
        vertical: 10,
        horizontal: 14
      ),

      margin: const EdgeInsets.symmetric(
        vertical: 4,
        horizontal: 12
      ),

      child: Text(
        message,
        style: TextStyle(
          height: 1.3,
          color: isMe ? Colors.black87 : theme.colorScheme.onSecondary
        ),
        softWrap: true,
      ),
    );
  }

  Widget messageContainer(BuildContext ctx) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 40),
      child: Row(
        // Move it to the right when my messages
        mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          Column(
            crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
            children: [
              if (isFirstInSequence)
                const SizedBox(height: 18),
              if (username != null)
                messageUsername(ctx),
              messageBox(ctx),
            ],
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack (children: [
      if (userImage != null)
        userImageSection(context),
      messageContainer(context),
    ]);
  }
}