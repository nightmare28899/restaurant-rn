import React from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface ActionSheetBaseProps {
    children: React.ReactNode;
    actionSheetRef: React.RefObject<ActionSheetRef | null>;
    closeable: boolean;
    gesture: boolean;
    showBackgroundColor: boolean;
}

const ActionSheetBase: React.FC<ActionSheetBaseProps> = ({children, ...props}) => {

    return (
        <ActionSheet
            ref={props.actionSheetRef}
            onChange={(position, height) => {
              // console.log('Position:', position);
              // console.log('Height:', height);
              // Position is 0 if action sheet has reached top.
              const hasReachedTop = position === 0;
              // Get the offset from bottom
              const offsetFromBottom = height - position;
            }}
            gestureEnabled={props.gesture}
            closable={props.closeable}
            backgroundInteractionEnabled={true}
            isModal={false}
            {...(props.showBackgroundColor ? { overlayColor: "transparent" } : {})}
            {...props}>
            {children}
        </ActionSheet>
    );
}

export default ActionSheetBase;
