use crate::prelude::*;
use air_r_syntax::RForStatement;
use air_r_syntax::RForStatementFields;
use biome_formatter::format_args;
use biome_formatter::write;

#[derive(Debug, Clone, Default)]
pub(crate) struct FormatRForStatement;
impl FormatNodeRule<RForStatement> for FormatRForStatement {
    fn fmt_fields(&self, node: &RForStatement, f: &mut RFormatter) -> FormatResult<()> {
        let RForStatementFields {
            for_token,
            l_paren_token,
            variable,
            in_token,
            sequence,
            r_paren_token,
            body,
        } = node.as_fields();

        let format_inner = format_with(|f| {
            write!(
                f,
                [
                    for_token.format(),
                    space(),
                    l_paren_token.format(),
                    group(&soft_block_indent(&format_args![
                        variable.format(),
                        soft_line_break_or_space(),
                        in_token.format(),
                        soft_line_break_or_space(),
                        sequence.format(),
                    ])),
                    r_paren_token.format(),
                    space(),
                    body.format(),
                ]
            )
        });

        write!(f, [group(&format_inner)])
    }
}
