import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

Macro.add('storyDesc', {
    skipArgs: false,
    handler: function () {
        let story = getScene('EventInteraction').story

        story.on('StoryUpdate', ({idx, snippet}) => {
            let $desc = $('<div/>').wiki(snippet)
            if(idx%2 === 0)
                $desc.addClass('gray')
            $(this.output).append($desc)
            $(this.output).scrollTop($(this.output).prop('scrollHeight'))            
        })
        _.each(story.storySnippets, (storyElement) => {
            $(this.output).append($('<div/>').wiki(storyElement))
        })
    }
})